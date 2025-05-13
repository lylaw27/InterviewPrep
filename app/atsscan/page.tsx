"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, File, X, Check, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Navbar from "@/components/navbar"
import { toast } from "@/components/ui/use-toast"
import { LoadingBackdrop } from "@/components/loading-backdrop"
import { useRouter } from 'next/navigation'


type UploadedFile = {
  id: string
  name: string
  size: number
  url: string
  status: "uploading" | "success" | "error"
  progress: number
}

export default function PdfUploader() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null)
  const [uploadedFile,setUploadedFile] = useState<UploadedFile | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("Uploading Your Resume...")

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return

    const file = selectedFiles[0]

    // Check if file is a PDF
    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed")
      return
    }

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size should not exceed 10MB")
      return
    }

    const newFile: UploadedFile = {
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file),
      status: "uploading",
      progress: 0,
    }

    setUploadedFile(newFile)
    setFile(file);

    // Simulate upload progress
    simulateUpload(newFile.id)
  }

  const simulateUpload = (fileId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5

      if (progress >= 100) {
        clearInterval(interval)
        progress = 100
        setUploadedFile((prev) => (prev ? { ...prev, status: "success", progress: 100 } : null))
      } else {
        setUploadedFile((prev) => (prev ? { ...prev, progress } : null))
      }
    }, 300)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileChange(e.dataTransfer.files)
  }

  const removeFile = () => {
    setUploadedFile(null)
    setFile(null)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  const submitResume = async () => {
    // Update status to uploading
    setIsProcessing(true)

    // Simulate different loading messages
    setTimeout(() => setLoadingMessage("Analyzing Your Resume..."), 3000)
    setTimeout(() => setLoadingMessage("Almost done..."), 10000)
    // Create a FormData object
    const formData = new FormData()
    if(file){
      formData.append('file', file)
      formData.append("jobTitle", title)
      formData.append("jobDescription", description)
    // try {
      const response = await fetch('/api/ats', {
        method: 'POST',
        body: formData,
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      if (response.status == 500) throw new Error('Upload failed');
      router.push(`/atsscan/${response.id}`);
      

    //   toast({
    //     title: "Upload successful",
    //     description: `${file.name} has been uploaded successfully.`,
    //   })
    // } catch (error) {
    //   console.error("Upload error:", error)
    //   // setUploadStatus((prev) => ({ ...prev, [file.name]: "error" }))

    //   toast({
    //     title: "Upload failed",
    //     description: `Failed to upload ${file.name}. Please try again.`,
    //     variant: "destructive",
    //   })
    // }
  }
  }

  return (
    <div>
    <Navbar/>
  <div className="container mx-auto py-10 px-4">
    <h1 className="text-3xl font-bold mb-6">PDF Upload Interface</h1>
    <div className="space-y-6">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary/50",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFileChange(e.target.files)}
          className="hidden"
          accept=".pdf"
        />
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Drag and drop your PDF here</h3>
            <p className="text-sm text-muted-foreground mt-1">or click to browse files</p>
          </div>
          <div className="text-xs text-muted-foreground">
            <p>Accepts PDF files up to 10MB</p>
          </div>
        </div>
      </div>

      {uploadedFile && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Uploaded File</h2>
          <Card className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded">
                    <File className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm line-clamp-1">{uploadedFile.name}</h4>
                    <p className="text-xs text-muted-foreground">{formatFileSize(uploadedFile.size)}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile()
                  }}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove file</span>
                </Button>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Upload progress</span>
                  <span>{uploadedFile.progress}%</span>
                </div>
                <Progress value={uploadedFile.progress} className="h-1" />
              </div>

              <div className="mt-4 flex justify-between">
                {uploadedFile.status === "success" ? (
                  <div className="flex items-center text-xs text-green-600">
                    <Check className="h-3 w-3 mr-1" />
                    Upload complete
                  </div>
                ) : uploadedFile.status === "error" ? (
                  <div className="flex items-center text-xs text-red-600">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Upload failed
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground">Uploading...</div>
                )}

                {uploadedFile.status === "success" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-7"
                    onClick={() => window.open(uploadedFile.url, "_blank")}
                  >
                    Preview PDF
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                placeholder="Fill in your job title, e.g., Civil Engineer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                placeholder="Fill in the description from the job posting, e.g., requirements, responsibilities, etc."
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <Button onClick={submitResume} className="w-full" disabled={uploadedFile.status !== "success" || isProcessing}>
              {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Resume
            </Button>
          </div>
        </div>
      )}
    </div>
      <LoadingBackdrop isLoading={isProcessing} message={loadingMessage} />
    </div>
    </div>
  )
}
