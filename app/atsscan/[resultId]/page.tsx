"use client"

import { AlertTriangle, Check, Info, X } from "lucide-react"
import Link from "next/link"
import StrengthIndicator from "@/components/strength-indicator";
import Navbar from "@/components/navbar";
import { getResult } from "./action";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { atsResultType } from "@/components/types/careerTypes";

export default function Result() {
    const resultId:string | string[] = useParams().resultId;
    const [atsResult,setAtsResult] = useState<atsResultType | null>(null);
    useEffect(() => {
        getResult(resultId).then((res) => {
            setAtsResult(res)
            console.log(res)
        })
    },[])
    if(atsResult === null) return (<></>)
    return (
    <div>
      <Navbar/>
    <div className="flex">
        <div className="flex flex-col items-center min-h-screen px-4 py-10 w-[30%] border-r">
              <StrengthIndicator value={atsResult.response.rating} label="RESUME RATING"/>
            <div className="w-full px-10 py-4">
              <h2 className="text-xl font-bold text-gray-800 py-2">Job Title</h2>
              <p className="text-gray-700 font-medium">{atsResult.job_title}</p>
            </div>
            <div className="w-full px-10 py-4">
              <h2 className="text-xl font-bold text-gray-800 py-2">Job Description</h2>
              <p className="text-gray-700 font-medium">{atsResult.job_description}</p>
            </div>
        </div>
      <div className=" mx-auto px-6 bg-gray-50 rounded-lg shadow-sm py-24 w-[70%]">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Summary</h2>
        </div>

        <p className="text-gray-700 mb-6">
          {atsResult.response.summary}
        </p>

        {/* <p className="text-gray-700 mb-6">
          <span className="font-medium">Tip:</span> Fix the red Xs to ensure your resume is easily searchable by
          recruiters and parsed correctly by the ATS.
        </p> */}
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Strengths</h2>
        </div>
        <div className="border rounded-lg divide-y mb-6">
          {/* ATS Tip Section */}
          {atsResult.response.strengths.map((content,index) => (

          <div key={index} className="p-4 flex items-start">
            <div className="w-1/3 flex items-center gap-2">
              <span className="text-gray-700 font-medium">{content.header}</span>
              <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                {/* <Info className="w-3 h-3 text-gray-400" /> */}
              </div>
            </div>
            <div className="w-2/3 space-y-3">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-700">
                    {content.paragraph}
                  </p>
                </div>
              </div>
            </div>
          </div>
          ))}
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Areas Of Improvement</h2>
        </div>
        <div className="border rounded-lg divide-y mb-6">
          {/* ATS Tip Section */}
          {atsResult.response.areasOfImprovement.map((content,index) => (
          <div key={index} className="p-4 flex items-start">
            <div className="w-1/3 flex items-center gap-2">
              <span className="text-gray-700 font-medium">{content.header}</span>
              <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                {/* <Info className="w-3 h-3 text-gray-400" /> */}
              </div>
            </div>
            <div className="w-2/3 space-y-3">
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-700">
                    {content.paragraph}
                  </p>
                </div>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    )
  }