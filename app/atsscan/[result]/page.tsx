import StrengthIndicator from "@/components/strength-indicator";

export default function Result() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <StrengthIndicator value={95} label="RESUME STRENGTH" color="#2E8B57" />
          </div>
  
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <StrengthIndicator value={10} label="PROFILE MATCH" color="#3B82F6" />
          </div>
  
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <StrengthIndicator value={60} label="SKILLS COVERAGE" color="#F59E0B" />
          </div>
        </div>
      </div>
    )
  }