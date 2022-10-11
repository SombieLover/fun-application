import styles from './index.module.scss';
import {
	IoMenuOutline,
	IoPerson,
	IoListOutline,
	IoQrCode,
} from 'react-icons/io5';
import Link from 'next/link';

export function Index() {
	return (
		<div className="row">
			<div className="container-fluid">
				<div className="d-flex justify-content-center p-4 row">
					<Link href={'tasks'}>
						<div
							className={`${styles.toolCard} card m-0 my-4 my-md-4 mx-md-4 col-10 col-md-4 col-lg-3 col-xl-2 p-3 shadow rounded border-0 d-flex justify-content-center align-items-center flex-column`}
						>
							<IoListOutline className={`${styles.cardIcon}`} />
							<p className="display-4 fw-bold">Tasks</p>
						</div>
					</Link>
					<Link href={'#'}>
						<div
							className={`${styles.toolCard} card m-0 my-4 my-md-4 mx-md-4 col-10 col-md-4 col-lg-3 col-xl-2 p-3 shadow rounded border-0 d-flex justify-content-center align-items-center flex-column`}
						>
							<IoQrCode className={`${styles.cardIcon}`} />
							<p className="display-4 fw-bold">TBD Tool</p>
						</div>
					</Link>
					<Link href={'#'}>
						<div
							className={`${styles.toolCard} card m-0 my-4 my-md-4 mx-md-4 col-10 col-md-4 col-lg-3 col-xl-2 p-3 shadow rounded border-0 d-flex justify-content-center align-items-center flex-column`}
						>
							<IoQrCode className={`${styles.cardIcon}`} />
							<p className="display-4 fw-bold">TBD Tool</p>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Index;
