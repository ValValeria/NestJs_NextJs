import styles from '../styles/Home.module.css'
import BasicLayout from "../layouts/basic-layout/basic-layout";

export default function () {
  return (
      <div className={styles.container}>
          <BasicLayout text={"Our users"} isSection={true}>

          </BasicLayout>
          <BasicLayout text={"Our achievement"} isSection={true}>

          </BasicLayout>
      </div>
  )
}
