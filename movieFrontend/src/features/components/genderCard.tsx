import { useState } from "react";
import { useUpdateGenderAndPreference } from "../hooks/use-UpdateGenderAndPreference";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "../hooks/use-Auth";
import { useUpdateGenderFromDashboard } from "../hooks/use-updateGenderFromDashboard";

export function GenderCard() {
  const [gender, setGender] = useState<string>("");
  const [genderPreference, setGenderPreference] = useState<string>("");
  const { mutate } = useUpdateGenderAndPreference();
  const {mutate: updateGender} = useUpdateGenderFromDashboard()
  const {data: auth} = useAuth()
  const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     if (!gender || !genderPreference) {
        return;
    }
    console.log("AUTH ", auth?.gender)
    console.log("AUTH  ", auth?.genderPreference)
    if(auth?.gender ==null && auth?.genderPreference== null){ 
        mutate({ gender, genderPreference });
    }else{
        updateGender({ gender, genderPreference })
    }
   
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card className="max-w-sm mx-auto shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Update Your Gender and Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-3">Gender</label>
                <Select value={gender} onValueChange={setGender} required = {true}>
                <SelectTrigger >
                    <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="NON_BINARY">Non-binary</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-3">Gender Preference</label>
                <Select value={genderPreference} onValueChange={setGenderPreference} required = {true}>
                <SelectTrigger >
                    <SelectValue placeholder="Select Gender Preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="NON_BINARY">Non-binary</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none mt-8"
            >
              Update Preferences
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
