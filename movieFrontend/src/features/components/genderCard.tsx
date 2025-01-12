import { useState } from "react";
import { useUpdateGenderAndPreference } from "../hooks/use-UpdateGenderAndPreference"; 
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export function GenderCard() {
  const [gender, setGender] = useState<string>("");
  const [genderPreference, setGenderPreference] = useState<string>("");
  const { mutate } = useUpdateGenderAndPreference();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gender && genderPreference) {
      mutate({ gender, genderPreference });
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-4">Update Your Gender and Preferences</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Gender</label>
          <Select value={gender} onValueChange={setGender} required>
            <SelectTrigger className="mt-1 block w-full">
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
          <label className="block text-sm font-medium">Gender Preference</label>
          <Select value={genderPreference} onValueChange={setGenderPreference} required>
            <SelectTrigger className="mt-1 block w-full">
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
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
          
        >
          
        </button>
      </form>
    </div>
  );
}
