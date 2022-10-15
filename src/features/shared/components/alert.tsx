import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";

interface Props {
  content: string;
  kind: "success" | "error";
}

export function ALert({ kind, content }: Props) {
  if (kind === "success") return <SuccessAlert kind={kind} content={content} />;
  if (kind === "error") return <ErrorAlert kind={kind} content={content} />;

  return null;
}

function SuccessAlert({ content }: Props) {
  return (
    <div className="rounded-md bg-green-50 p-4 border border-green-300">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-5 w-5 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800">{content}</p>
        </div>
      </div>
    </div>
  );
}

function ErrorAlert({ content }: Props) {
  return (
    <div className="rounded-md bg-red-50 p-4 border border-red-300">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-red-800">{content}</p>
        </div>
      </div>
    </div>
  );
}
