import { contactChannels } from "@/lib/contact-info";
import { ContactChannelItem } from "./contact-channel-item";

export function ContactChannelList() {
  return (
    <ul className="flex flex-col gap-6">
      {contactChannels.map((channel) => (
        <li key={channel.label}>
          <ContactChannelItem channel={channel} />
        </li>
      ))}
    </ul>
  );
}
