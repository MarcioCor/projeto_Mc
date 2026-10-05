import type { ContactChannel } from "@/lib/contact-info";
import { ContactChannelIcon } from "./contact-channel-icon";

type ContactChannelItemProps = {
  channel: ContactChannel;
};

function isExternalLink(href: string): boolean {
  return href.startsWith("http");
}

export function ContactChannelItem({ channel }: ContactChannelItemProps) {
  const { icon, label, value, href } = channel;

  return (
    <div className="flex gap-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
        <ContactChannelIcon name={icon} />
      </span>
      <dl>
        <dt className="text-sm font-medium text-stone-500 dark:text-stone-400">
          {label}
        </dt>
        <dd className="mt-0.5 font-medium text-stone-900 dark:text-stone-50">
          {href ? (
            <a
              href={href}
              className="underline-offset-4 hover:text-amber-700 hover:underline dark:hover:text-amber-400"
              {...(isExternalLink(href)
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {value}
            </a>
          ) : (
            value
          )}
        </dd>
      </dl>
    </div>
  );
}
