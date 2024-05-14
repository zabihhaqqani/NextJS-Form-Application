import { ContactForm } from "../components/form"
import Navbar from "../components/navbar"

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="flex min-h-[90vh] flex-col items-center justify-between p-10">
        <ContactForm />
      </main>
    </div>
  )
}
