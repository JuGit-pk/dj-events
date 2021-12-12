import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Events from ".";

const EventPage = ({ evt }) => {
  const delteEvent = (e) => {
    console.log(e);
  };
  return (
    <Layout>
      <div className={styles["event"]}>
        <div className={styles["controls"]}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={delteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>
        <span>
          {evt.date} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image} width={960} height={600} />
          </div>
        )}
        <h3>Performers :</h3>
        <p>{evt.performers}</p>
        <h3>Description</h3>
        <p>{evt.description}</p>
        <h3>Venue : {evt.venue}</h3>
        <p>{evt.address}</p>
        <Link href="/events">
          <a className={styles.back}> {"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
};

export default EventPage;

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);
  const e = await res.json();

  const paths = e.map((event) => ({
    params: {
      slug: event.slug,
    },
  }));
  // console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const myEvents = await res.json();
  return {
    props: { evt: myEvents[0] },
  };
}
