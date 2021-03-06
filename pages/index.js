import Layout from "/components/Layout";
import { API_URL } from "/config/index";
import EventItem from "/components/EventItem";
import Link from "next/link";

export default function HomePage({ events }) {
  console.log(events);
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
      {events && (
        <Link href={"/events"}>
          <a>See all events</a>
        </Link>
      )}
    </Layout>
  );
}
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();
  console.log(events);
  return {
    props: { events: events.slice(0, 3) },
  };
}
