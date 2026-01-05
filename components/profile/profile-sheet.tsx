"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import UserInfo from "./info";
import { Button } from "../ui/button";
import Logout from "../logout";

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
                    <Button>Save Changes</Button>
                    <Logout />
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default ProfileSheet;