import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  flexRow: {
    display: "flex",
    gap: "10px",
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  rowItem: {
    flex: "1 1 auto",
    minWidth: "100%",
  },
  flexColLeft: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "fit-content",
  },
  flexColCenter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "100%",
  },
  colItem: {
    marginBottom: "10px",
  },
  fullWidthCenter: {
    minWidth: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  fullWidth: {
    minWidth: "100%",
    margin: "10px 0",
    padding: "10px",
  },
  marginCenter: {
    margin: "0 auto",
  },
  mainPageHeading: {
    padding: "10px 0 10px 10px",
    fontWeight: "bold",
  },
  id: {
    fontSize: "15px",
    color: "gray",
  },
  cardHeadingWrapper: {
    color: "white",
    background:
      "linear-gradient(0deg, rgba(100,142,190,1) 0%, rgba(138,190,250,1) 70%)",
    borderRadius: "0.5rem 0.5rem 0 0",
    padding: "10px",
    minWidth: "100%",
  },
  cardContentWrapper: {
    padding: "10px",
    borderRadius: "0 0 0.5rem 0.5rem",
  },
  cardInfoTileWrapper: {
    borderRadius: "0.5rem 0.5rem 0.5rem 0.5rem",
    boxShadow: "0px 0px 8px 0px rgba(34, 60, 80, 0.2)",
    marginBottom: "10px",
    minWidth: "100%",
  },
  backButton: { margin: "10px 0", background: "white", textDecoration: "none" },
});
