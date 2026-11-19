export interface Event {
  id: string;
  created_at: string;
  event_date: string;
  title: string;
  subtitle: string;
  image_url: string | null;
  performers: string | null;
  entry_type: "libero" | "pagamento";
  ticket_link: string | null;
  show_reference: string;
}
