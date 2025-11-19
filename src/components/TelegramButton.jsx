import { generateTelegramLink } from "../services/telegramService";

export default function TelegramButton({ userId }) {
  const link = generateTelegramLink(userId);

  return (
    <a href={link} target="_blank" rel="noreferrer">
      <button className="telegram-btn">Connect Telegram</button>
    </a>
  );
}
