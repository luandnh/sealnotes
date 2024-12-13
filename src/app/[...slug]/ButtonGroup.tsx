
import { Button } from "@/components/ui/button";
import LoadingBtn from "@/components/LoadingBtn";
import Link from "next/link";
import { DeleteSite } from "@/components/controlModals/delete-site";
import { ChangePassword } from "@/components/controlModals/change-password";

type ButtonGroupProps = {
  onSubmit: () => void;
  onRefresh: () => void;
  isSubmitting: boolean;
  params: string;
  values: string;
};


export default function ButtonGroup({
  onSubmit,
  onRefresh,
  params,
  values,
  isSubmitting,
}: ButtonGroupProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 sm:gap-0">
      <Link href="/">
        <div className="text-lg font-semibold hidden sm:block">
          SealNotes
        </div>
      </Link>

      <div className="flex flex-col sm:flex-row sm:justify-end gap-2 w-full sm:w-auto">
        <Button variant="outline" className="w-full sm:w-auto" onClick={onRefresh}>
          Refresh
        </Button>
        <ChangePassword params={params} values={values}/>
        <LoadingBtn onClick={onSubmit} loading={isSubmitting} className="w-full sm:w-auto">
          Save
        </LoadingBtn>
        <DeleteSite params={params}/>
      </div>
    </div>
  );
}
