import { useCallback, useEffect, useRef, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Modals from "layouts/modals/modals";

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import Tablelist from "./components/tablelist/tablelist";

// Dashboard layout components
import Map from "./components/map";

// Style
import styles from "./index.module.css";

// Data
import Count from "./data/countdata";
import Position from "./data/positiondata";
import Tabledata from "./data/tabledata";

function Dashboard() {
  const isInitialMount = useRef(true);

  const [markerPositions, setMarkerPositions] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [warningCount, setWarningCount] = useState(0);
  const [cautionCount, setCautionCount] = useState(0);
  const [warnRows, setWarnRows] = useState([]);
  const [rows, setRows] = useState([]);

  const count = new Count();
  const position = new Position();
  const tabledata = new Tabledata();

  const columns = [
    { name: "작업자", align: "center" },
    { name: "그룹", align: "center" },
    { name: "연락처", align: "center" },
    { name: "행동", align: "center" },
  ];

  const Mcolumns = [
    { name: "작업자", align: "center" },
    { name: "그룹", align: "center" },
    { name: "연락처", align: "center" },
    { name: "행동", align: "center" },
    { name: "시간", align: "center" },
  ];

  // Modal state function
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // total
  useEffect(() => {
    const timer = setTimeout(() => {
      tabledata //
        .datatable()
        .then((table) => setRows(table));

      position //
        .totalPosition()
        .then((total) => {
          setMarkerPositions([]);
          setMarkerPositions(total);
        });

      count //
        .totalCountData()
        .then((total) => setTotalCount(total));

      count //
        .warningCountData()
        .then((warn) => setWarningCount(warn));

      count //
        .cautionCountData()
        .then((caution) => setCautionCount(caution));
    }, 3000);
    return () => clearTimeout(timer);
  }, [rows]);

  // warn Event
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      tabledata //
        .warningtable()
        .then((warntable) => setWarnRows(warntable));
      openModal();
    }
  }, [warningCount]);

  const totalClick = useCallback(() => {
    position //
      .totalPosition()
      .then((total) => {
        setMarkerPositions([]);
        setMarkerPositions(total);
      });
  }, [markerPositions]);

  const warnClick = useCallback(() => {
    position //
      .warningPosition()
      .then((warn) => {
        setMarkerPositions([]);
        setMarkerPositions(warn);
      });
  }, [markerPositions]);

  const cautionClick = useCallback(() => {
    position //
      .cautionPosition()
      .then((caution) => {
        setMarkerPositions([]);
        setMarkerPositions(caution);
      });
  }, [markerPositions]);

  return (
    <>
      <Modals
        open={modalOpen}
        close={closeModal}
        header="WARNING"
        columns={Mcolumns}
        warnRows={warnRows}
      >
        팝업창입니다.
      </Modals>
      <DashboardLayout>
        <DashboardNavbar />
        <SuiBox py={3}>
          <SuiBox mb={3}>
            <Grid container spacing={3}>
              <Grid className={styles.Card} item xs={12} sm={4} xl={4} onClick={totalClick}>
                <MiniStatisticsCard
                  title={{ text: "전체" }}
                  count={totalCount}
                  icon={{ color: "info", component: "public" }}
                >
                  현재작업자
                </MiniStatisticsCard>
              </Grid>
              <Grid className={styles.Card} item xs={12} sm={4} xl={4} onClick={warnClick}>
                <MiniStatisticsCard
                  className={styles.Warning}
                  title={{ text: "경고" }}
                  count={warningCount}
                  icon={{ color: "error", component: "public" }}
                />
              </Grid>
              <Grid className={styles.Card} item xs={12} sm={4} xl={4} onClick={cautionClick}>
                <MiniStatisticsCard
                  title={{ text: "주의" }}
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
