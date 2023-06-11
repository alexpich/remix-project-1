import { json, redirect } from "@remix-run/node";
import {
  Link,
  useRouteError,
  isRouteErrorResponse,
  useLoaderData,
} from "@remix-run/react";
import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import NoteList, { links as noteListLinks } from "~/components/NoteList";
import { getStoredNotes, storeNotes } from "~/data/notes";

export default function NotesPage() {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export async function loader() {
  const notes = await getStoredNotes();
  if (!notes || notes.length === 0) {
    throw json(
      { message: "Could not find any notes." },
      { status: 404, statusText: "Not Found" }
    );
  }
  return notes;
}

export async function action({ request }: any) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);
  // Add validation

  if (noteData.title.trim().length < 5) {
    return { message: "Error: Title must 5 or more characters." };
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  storeNotes(updatedNotes);
  return redirect("/notes");
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}

// export function CatchBoundary() {
//   const caughtResponse = useCatch();
//   const message = caughtResponse.data?.message || "Data not found.";

//   return (
//     <main>
//       <p>{message}</p>
//     </main>
//   );
// }

// export function ErrorBoundary({ error }: { error: Error }) {
//   return (
//     <main className="error">
//       <h1>An error related to your notes occurred!</h1>
//       <p>{error?.message}</p>
//       <p>
//         Back to <Link to="/">safety</Link>!
//       </p>
//     </main>
//   );
// }

export function ErrorBoundary() {
  const error = useRouteError();
  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <main className="error">
        <h1>An error related to your notes occurred!</h1>
        <p>{error.data.message}</p>
        <p>
          Back to <Link to="/">safety</Link>!
        </p>
      </main>
    );
  }
}
