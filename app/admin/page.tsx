"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import Navbar from "../../components/navbar"
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table"
import { Edit } from "../../components/edit"

interface FormData {
  id: string
  name: string
  email: string
  message: string
}

export default function Admin() {
  const [formData, setFormData] = useState<FormData[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get<FormData[]>("/api/contact")
      setFormData(response.data)
    } catch (error) {
      console.error("Error fetching form data:", error)
    }
  }

  const deleteFormData = async (id: string) => {
    try {
      await axios.delete(`/api/contact`, { data: { id } })
      fetchData()
    } catch (error) {
      console.error("Error deleting form data:", error)
    }
  }

  return (
    <div className="md:text-lg lg:text-lg text-sm">
      <Navbar />
      <div className="flex flex-col items-center justify-between p-5 ">
        <h1 className="font-semibold text-2xl my-3">Admin Panel</h1>
        <h3 className="">Form Submissions</h3>
        <div className="flex items-center justify-center w-[100%] md:w-[750px] sm:w-[600px]">
          {formData.length > 0 ? (
            <Table className="w-[90%]">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                </TableRow>{" "}
              </TableHeader>
              <TableBody>
                {formData?.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.email}</TableCell>
                    <TableCell>{data.message}</TableCell>
                    <Button
                      type="submit"
                      variant="default"
                      onClick={() => deleteFormData(data.id)}
                    >
                      Delete
                    </Button>

                    <Edit data={data} fetchData={() => fetchData()} />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="my-3">No Submissions!</p>
          )}
        </div>
      </div>
    </div>
  )
}
