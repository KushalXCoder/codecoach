import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import UserInfo from "./info";
import { Button } from "../ui/button";

const ProfileSheet = () => {
    return (
        <Sheet>
            <SheetTrigger>Profile</SheetTrigger>
            <SheetContent className="font-sans">
                <SheetHeader>
                <SheetTitle>Your Profile</SheetTitle>
                <SheetDescription>
                    Click save after making the changes. Otherwise, changes wont be applied.
                </SheetDescription>
                <UserInfo />
                </SheetHeader>
                <SheetFooter>
                    <Button type="submit">Save Changes</Button>
                    <SheetClose>
                        <Button variant="outline" className="w-full">Cancel</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default ProfileSheet;