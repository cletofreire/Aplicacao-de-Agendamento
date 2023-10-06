import React from "react";
import { SchedulingForm } from "@/components/SchedulingForm/SchedulingForm";
import styles from "./page.module.css";

export const revalidate = 0;

const Home = () => {
	return (
		<>
			<section className={styles['section-form']}>
				<SchedulingForm />
			</section>
		</>
	);
};

export default Home;