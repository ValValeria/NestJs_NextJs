import styles from '../styles/Home.module.css'
import Banner from "../components/banner/banner";
import UsersList from "../components/users_list/users_list";
import Updates from "../components/updates/updates";
import Achievements from "../components/achievements/achievements";
import Contacts from "../components/contacts/contacts";

export default function Index() {
  return (
      <div className={styles.container}>
          <Banner/>
          <UsersList/>
          <Updates/>
          <Achievements/>
          <Contacts/>
      </div>
  )
}
