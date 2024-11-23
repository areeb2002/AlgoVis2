import React, { useState } from "react";
import "./../css/pages/Dijkstra.css";
import Canvas from "./components/Canvas";
import useToggler from "./components/Toggler";
import sleepFun from "./components/utils/sleepFun";
import { Button} from "@material-ui/core";
import { Select } from "antd";
import SearchIcon from "@material-ui/icons/Search";
import { ClearOutlined } from "@ant-design/icons";
//This Only for snackbar
import { useSnackbar } from "notistack";
import Zoom from "@material-ui/core/Zoom";
//----------------------------------------

function Dijkstra() {

	//const [style, setstyle]= useState("red");
	const [arr, setArr] = useState([]);
	const [reload, setReload] = useToggler(true);
	const [time, setTime] = useState(60);
	const [ setModalVisible] = useState(false);

	///This For SnackBar
	const { enqueueSnackbar } = useSnackbar();

	const handleStart = async () => {
		if (arr.length !== 0) {
			for (let line of arr) {
				await sleepFun(time);
				line.setColor("#0000FF");
			}
		} else {
			enqueueSnackbar("Please set Arrows positions correctly", {
				variant: "error",
				autoHideDuration: 2000,
				anchorOrigin: {
					vertical: "top",
					horizontal: "center",
				},

				TransitionComponent: Zoom,
			});
		}
	};

	const handleReload = () => {
		setReload();
	};

	const handleTimeChange = (e) => {
		setTime(e);
	};

	const handleDemo = () => {
		setModalVisible(true);
	};

	//This is 'SELECT' COMPONENT
	const { Option } = Select;

	return (
		<div
		// style={{ position: "absolute" }}
		>
			
			<Canvas reload={reload} setArr={setArr} setReload={setReload} />

			<div className="navigation-area">
			

				<div className="DijkstraButton-Container">
					<Button
						onClick={handleStart}
						variant="contained"
						color="#1f5156"
						size="large"
						startIcon={<SearchIcon />}
					>
						start
					</Button>
					<Button
						onClick={handleReload}
						variant="contained"
						color="success"
						size="small"
						startIcon={<ClearOutlined />}
					>
						clear
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Dijkstra;
