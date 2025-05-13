"use client"

import { AlertTriangle, Check, Info, X } from "lucide-react"
import Link from "next/link"
import StrengthIndicator from "@/components/strength-indicator";
import Navbar from "@/components/navbar";

export default function Result() {
    return (
    <div>
      <Navbar/>
    <div className="flex">
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 w-[40%] border-r">
            {/* <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md"> */}
              <StrengthIndicator value={95} label="RESUME RATING" color="#2E8B57" />
            {/* </div> */}
            <div className="w-full px-10 py-4">
              <h2 className="text-xl font-bold text-gray-800 py-2">Job Title</h2>
              <p className="text-gray-700 font-medium">Civil Engineer</p>
            </div>
            <div className="w-full px-10 py-4">
              <h2 className="text-xl font-bold text-gray-800 py-2">Job Description</h2>
              <p className="text-gray-700 font-medium">Job Duties:
Assist in development and implementation of quality plans in related to structural matters.
Prepare temporary works design, method statement, and advise in structural matters.
Attend regular site meetings, identify potential engineering problems with recommended solution.
Supervise and/or carry out inspection of works and materials in according to quality plans.
Prepare master programme, reports, and sketches on technical matters.
Monitor site progress and prepare site progress reports.
Liaise with Architect / Client / Consultants and sub-contractors for technical matters.
Assist in contractual claims in technical matters.
Assist in implementation of Site Safety Supervision Plan.
To perform the role of Technically Competent Person (TCP) as specified in Site Safety Supervision Plan as assigned by the Manager.

Requirements:
Degree in Civil / Structural Engineering or equivalent.
3 years relevant experience in major Civil or Building projects.
Good interpersonal and communication skills.
Good command of spoken and written English & Chinese."
</p>
            </div>
        </div>
      <div className=" mx-auto px-6 bg-gray-50 rounded-lg shadow-sm py-24">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Results</h2>
        </div>

        <p className="text-gray-700 mb-6">
          An ATS (Applicant Tracking System) is a software used by 90% of companies and recruiters to search for resumes
          and manage the hiring process. Below is how well your resume appears in an ATS and a recruiter search.
        </p>

        {/* <p className="text-gray-700 mb-6">
          <span className="font-medium">Tip:</span> Fix the red Xs to ensure your resume is easily searchable by
          recruiters and parsed correctly by the ATS.
        </p> */}

        <div className="border rounded-lg divide-y">
          {/* ATS Tip Section */}
          <div className="p-4 flex items-start">
            <div className="w-1/3 flex items-center gap-2">
              <span className="text-gray-700 font-medium">ATS Tip</span>
              <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                <Info className="w-3 h-3 text-gray-400" />
              </div>
            </div>
            <div className="w-2/3 space-y-3">
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-700">
                    Adding this job's company name and web address can help us provide you ATS-specific tips.
                  </p>
                  <Link href="#" className="text-blue-600 hover:underline text-sm">
                    Update scan information
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="p-4 flex items-start">
            <div className="w-1/3 flex items-center gap-2">
              <span className="text-gray-700 font-medium">Contact Information</span>
              <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                <Info className="w-3 h-3 text-gray-400" />
              </div>
            </div>
            <div className="w-2/3 space-y-3">
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">
                  We did not find an address in your resume. Recruiters use your address to validate your location for job
                  matches.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">
                  You provided your email. Recruiters use your email to contact you for job matches.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">You provided your phone number.</p>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          {/* <div className="p-4 flex items-start">
            <div className="w-1/3 flex items-center gap-2">
              <span className="text-gray-700 font-medium">Summary</span>
              <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                <Info className="w-3 h-3 text-gray-400" />
              </div>
            </div>
            <div className="w-2/3 space-y-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">
                  We did not find a summary section on your resume. The summary provides a quick overview of the
                  candidate's qualifications, helping recruiters and hiring managers promptly grasp the value the
                  candidate can offer in the position.
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
    </div>
    )
  }