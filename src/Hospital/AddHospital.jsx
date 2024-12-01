import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useState } from "react";
import axios from "axios";
import Appbar from "../Appbar";
import "../Employee/css/AddEmployee.css";

function AddHospital({ userType, userName, setUserName }) {
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [csvFile, setCsvFile] = useState(null);
    const handleSubmit = async () => {
        const formData = new FormData();

        if (csvFile) {
            formData.append("file", csvFile);
            try {
                await axios.post("http://localhost:3000/api/auth/createHospital", formData, {
                    headers: {
                        // "Authorization": "Bearer " + localStorage.getItem("token"),
                        "Content-Type": "multipart/form-data"
                    }
                });
                alert("Hospital added successfully from CSV file!");
                setCsvFile(null);  // Clear the file input after successful submission
            } catch (error) {
                alert("Error uploading CSV file. Please try again.");
                console.error("Error uploading CSV file:", error);
            }
        } else {
            try {
                await axios.post("http://localhost:3000/admin/employee", {
                    name: name,
                    designation: designation,
                    published: true,
                }, {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
                alert("Hospital added successfully!");
                // Clear form fields after successful submission
                setName("");
                setDesignation("");
            } catch (error) {
                alert("Error adding Hospital. Please try again.");
                console.error("Error adding Hospital:", error);
            }
        }
    };

    return (
        <div className="add-employee-container">
            {/* {userType === "admin" || userType === "user" ? ( */}
                <Appbar userName={userName} setUserName={setUserName} />
            {/* ) : null} */}
            <div className="add-employee-form-container">
                <Card variant="outlined" className="add-employee-card">
                    <h2 className="add-employee-title">Add New Hospital</h2>
                    <TextField
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        label="Name"
                        variant="outlined"
                        className="input-field"
                        value={name}
                        disabled={!!csvFile}
                    />
                    <TextField
                        onChange={(e) => setDesignation(e.target.value)}
                        fullWidth
                        label="Designation"
                        variant="outlined"
                        className="input-field"
                        value={designation}
                        disabled={!!csvFile}
                    />
                      <div className="upload-csv-container">
                        <input
                            type="file"
                            accept=".csv"
                            onChange={(e) => setCsvFile(e.target.files[0])}
                        />
                    </div>
                    <Button
                        size="large"
                        variant="contained"
                        onClick={handleSubmit}
                        className="submit-button"
                    >
                         {csvFile ? "Upload CSV" : "Add Hospital"}
                    </Button>
                </Card>
            </div>
        </div>
    );
}

export default AddHospital;