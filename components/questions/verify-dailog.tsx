import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { verifyCodeforcesId } from "@/services/user.service";
import Link from "next/link";
import { toast } from "sonner";

type VerifyDialogProps = {
    codeforcesId: string;
    open: boolean;
    setOpen: (open: boolean) => void;
};

const VerifyDialog = ({ codeforcesId, open, setOpen } : VerifyDialogProps) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await verifyCodeforcesId(codeforcesId);
    if(!res.success) {
        toast(res.message || "Verification failed");
    } else {
      toast(res.message || "Verification successful");
    }

    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-sans">Verify your Codeforces ID</DialogTitle>
            <DialogDescription>
                <div className="border rounded-lg border-gray-700 px-4 py-2 mt-3 flex flex-col gap-2 font-sans">
                    <p className='text-gray-500'>Visit <Link href="https://codeforces.com/settings/social" className='text-blue-500 underline'>https://codeforces.com/settings/social</Link> or go to your codeforces profile and click settings and then go to social. There change your institution to <span className='text-primary cursor-pointer'>CodeCoach</span> and save it.</p>
                </div>
                <p className='text-red-500 text-sm mt-2 font-sans'>Note: This is only a one time thing. After, verifying you can change it back to your original institution.</p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Verify</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default VerifyDialog;