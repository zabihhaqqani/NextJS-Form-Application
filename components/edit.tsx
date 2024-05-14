import React, { useState, ChangeEvent, FormEvent } from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios"

interface UserData {
  id: string
  name: string
  email: string
  message: string
}

interface EditProps {
  data: UserData
  fetchData: () => void
}

export const Edit: React.FC<EditProps> = ({ data, fetchData }) => {
  const [formData, setFormData] = useState<UserData>(data)
  const [isSaving, setSaving] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const saveChangesHandler = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    try {
      setSaving(true)
      const res = await axios.put(`/api/data/${formData.id}`, formData)
      fetchData()
      if (res.status === 200) {
        console.log("Data saved successfully")
      }
    } catch (err) {
      setError(err.message || "An error occurred while saving.")
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <>
      {!isSaving && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="ml-4">
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update</DialogTitle>
            </DialogHeader>
            <form onSubmit={saveChangesHandler}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="message" className="text-right">
                    Message
                  </Label>
                  <Input
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save changes"}
                </Button>
                {error && <p className="text-red-500">{error}</p>}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
