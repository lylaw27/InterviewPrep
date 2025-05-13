import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NextRequest,NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest, res: NextResponse) {
  const form = await req.formData();
  const resume = form.get('file') as File;
  const jobDescription = form.get('jobDescription') as string;
  const jobTitle = form.get('jobTitle') as string;

  // Please install OpenAI SDK first: `npm install openai`
  const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
  });

  const file = await client.files.create({
    file: resume,
    purpose: "user_data",
  });

  const aiRes = await client.responses.parse({
    model: "gpt-4.1-mini",
    input:[
      {
        "role": "system",
        "content": "Rate the following resume out of 100. List all the strengths and areas of improvement according to the given job description.",
    },
      {
        "role": "user",
        "content": [
          {
            type: "input_file",
            file_id: file.id,
          },
          {
            type: "input_text",
            text: `Here is my resume. I am applying for a ${jobTitle} Position. Please rate my resume according to this job description: \n ${jobDescription}.`
          }
        ],
      }
    ],        
    text:{
      format: { 
        "type": "json_schema",
        "name": "resume_rating",
        "description": "Fetches the rating and comments of a resume",
        "strict": true,
        "schema": {
          "type": "object",
          "properties": {
            "rating": {
              "type": "integer"
            },
            "summary": {
              "type": "string"
            },
            "strengths": {
              "type": "array",
              "items": {
                "$ref": "#/$defs/comment"
              }
            },
            "areasOfImprovement": {
              "type": "array",
              "items": {
                "$ref": "#/$defs/comment"
              }
            }
          },
          "$defs": {
            "comment": {
              "type": "object",
              "properties": {
                "header":{
                  "type": "string"
                },
                "paragraph": {
                  "type": "string"
                }
              },
              "required": ["header", "paragraph"],
              "additionalProperties": false
            }
          },
          "required": ["rating", "strengths", "areasOfImprovement"],
          "additionalProperties": false
        }
    },
    }
  });

  const supabase = createClient();
  const { data, error } = await supabase
  .from('resumeRating')
  .insert({
    job_title: jobTitle,
    job_description: jobDescription,
    response: aiRes.output_parsed
  })
  .select();
  if (error) {
    redirect('/error')
  }
  redirect('/atsscan/' + data[0].id);

  // console.log(aiRes.output_parsed);
  // return NextResponse.json(
  //   data
  // );
}