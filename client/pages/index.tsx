import styles from '../styles/Home.module.css'
import Banner from "../components/banner/banner";
import Updates from "../components/updates/updates";
import Achievements from "../components/achievements/achievements";
import Contacts from "../components/contacts/contacts";
import BasicLayout from "../layouts/basic-layout/basic-layout";
import LatestPosts from "../components/latest_posts/latest_posts";

export default function Index() {
  return (
      <div className={styles.container}>
          <Banner/>
          <BasicLayout text={"Our latest posts"}>
              <div className={"w-100 center"}>
                  <LatestPosts/>
              </div>
          </BasicLayout>
          <Updates/>
          <Achievements/>
          <Contacts/>
      </div>
  )
}
