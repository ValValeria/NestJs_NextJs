import styles from '../styles/Home.module.css'
import BasicLayout from "../layouts/basic-layout/basic-layout";
import Banner from "../components/banner/banner";

export default function Index() {
  return (
      <div className={styles.container}>
          <Banner/>
          <BasicLayout text={"Our users"}>

          </BasicLayout>
          <BasicLayout text={"Our achievement"}>

          </BasicLayout>
          <BasicLayout text={"Contact us"}>

          </BasicLayout>
      </div>
  )
}
