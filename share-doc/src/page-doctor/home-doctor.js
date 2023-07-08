import ButtonNew from '../components/button/button-new';
import DocumentsPage from '../page-patient/documents-page';
import { makeStyles } from '@material-ui/core/styles';
import PatientList from "./patient-list";

function HomeDoctor( { doctor }) {
    const classes = useStyles();

    return (
        <div className={classes.home}>
            <div className={classes.left}>
                <h1>Mes patients</h1>
                <PatientList />
            </div>
        </div>
    );
}

export default HomeDoctor;


const useStyles = makeStyles({
    home: {
        display: 'flex',
        alignItems: 'flex-start',
        width: '100%',
    },
    left: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '30%',
        marginLeft: '2rem',
        marginTop: '2rem',
    },
});