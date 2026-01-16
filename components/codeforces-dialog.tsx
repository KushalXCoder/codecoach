import CodeforcesInput from "./questions/codeforces-input";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";

type CodeforcesDialogProps = {
    open: boolean,
    onOpenChange: (open: boolean) => void,
}

const CodeforcesDialog = ({ open, onOpenChange }: CodeforcesDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
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