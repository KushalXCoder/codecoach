"use client";

import { appStore } from "@/store/app.store";
import CodeforcesInput from "./questions/codeforces-input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";

const CodeforcesDialog = () => {
    const { openCodeforcesDialog, setOpenCodeforcesDialog } = appStore();
    return (
        <Dialog open={openCodeforcesDialog} onOpenChange={setOpenCodeforcesDialog}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-sans">Enter your codeforces Id</DialogTitle>
                    <DialogDescription>
                        <CodeforcesInput />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CodeforcesDialog;