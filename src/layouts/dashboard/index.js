import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

// Soft UI Dashboard React base styles

// Dashboard layout components
import Modals from "layouts/modals/modals";
import Map from "./components/map";

// Style
import styles from "./index.module.css";

// Data
import Tabledata from "./data/tabledata";
import Tablelist from "./components/tablelist/tablelist";
import Positiondata from "./data/positiondata";
import Countdata from "./data/countdata";

function Dashboard() {
  const [markerPositions, setMarkerPositions] = useState([]);

  const { columns, rows } = Tabledata();

  const { totalWorker, warningWorker, cautionWorker } = Positiondata();

  const { totalCount, warningCount, cautionCount } = Countdata();

  // Modal state function
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (warningCount > 0 || cautionCount) {
    useEffect(() => {
      openModal();
    }, [warningCount, cautionCount]);
  }

  return (
    <>
      <Modals open={modalOpen} close={closeModal} header="WARNING">
        팝업창입니다.
      </Modals>
      <DashboardLayout>
        <DashboardNavbar />
        <SuiBox py={3}>
          <SuiBox mb={3}>
            <Grid container spacing={3}>
              <Grid
                className={styles.Card}
                item
                xs={12}
                sm={4}
                xl={4}
                onClick={() => setMarkerPositions(totalWorker)}
              >
                <MiniStatisticsCard
                  title={{ text: "현재 작업자" }}
                  count={totalCount}
                  icon={{ color: "info", component: "paid" }}
                >
                  현재작업자
                </MiniStatisticsCard>
              </Grid>
              <Grid
                className={styles.Card}
                item
                xs={12}
                sm={4}
                xl={4}
                onClick={() => setMarkerPositions(warningWorker)}
              >
                <MiniStatisticsCard
                  title={{ text: "부상 의심자" }}
                  count={warningCount}
                  icon={{ color: "error", component: "public" }}
                />
              </Grid>
              <Grid
                className={styles.Card}
                item
                xs={12}
                sm={4}
                xl={4}
                onClick={() => setMarkerPositions(cautionWorker)}
              >
                <MiniStatisticsCard
                  title={{ text: "안전모 착용 주의자" }}
                  count={cautionCount}
                  icon={{ color: "warning", component: "public" }}
                />
              </Grid>
            </Grid>
          </SuiBox>
          <SuiBox mb={3}>
            <Map markerPositions={markerPositions} />
          </SuiBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={12}>
              <Tablelist columns={columns} rows={rows} />
            </Grid>
          </Grid>
        </SuiBox>
        <Footer />
      </DashboardLayout>
    </>
  );
}

export default Dashboard;
