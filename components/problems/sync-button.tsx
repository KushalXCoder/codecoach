"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";

type SyncButtonProps = {
    tabValue: string,
};

const SyncButton = ({ tabValue } : SyncButtonProps) => {
    const handleClick = () => {
        if(tabValue === 'past') {
            toast('Sync is only available for today\'s problems.');
            return;
        }
    }
    return (
        <Button onClick={handleClick}>
            Sync Problems
        </Button>
    )
}

export default SyncButton;