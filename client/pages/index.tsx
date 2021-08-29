import styles from '../styles/Home.module.css'
import BasicLayout from "../layouts/basic-layout/basic-layout";
import Banner from "../components/banner/banner";
import {Grid, Typography} from "@material-ui/core";
import SimpleCard from "../components/simple_card/simple_card";

export default function Index() {
  return (
      <div className={styles.container}>
          <Banner/>
          <BasicLayout text={"Our users"}>
          </BasicLayout>
          <BasicLayout text={"Our achievement"}>
              <Grid container
                    direction={"column"}
                    justifyContent={"center"}
                    spacing={4}
                    alignItems={"center"}
                    className={"w-100"}>
                  <Grid item>
                      <Typography variant={"subtitle1"}>

                      </Typography>
                  </Grid>
                  
                  <Grid item
                        container
                        spacing={3}
                        justifyContent={"center"}
                  >
                      <Grid item>
                          <SimpleCard title={"714K"} descr={"Weekly visits"}/>
                      </Grid>

                      <Grid item>
                          <SimpleCard title={"470K"} descr={"The number of our users"}/>
                      </Grid>

                      <Grid item>
                          <SimpleCard title={"956"} descr={"The number of downloads"}/>
                      </Grid>
                  </Grid>
              </Grid>
          </BasicLayout>
          <BasicLayout text={"Contact us"}>

          </BasicLayout>
      </div>
  )
}
