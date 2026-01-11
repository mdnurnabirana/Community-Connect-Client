import React from "react";
import Container from "../../shared/Container";
import authorImg from "../../assets/author.jpg";
import { motion } from "motion/react";

const About = () => {
  return (
    <Container>
      <title>CC - About us</title>
      <section className="my-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral mb-4">
            About Community Connect
          </h1>
          <p className="text-md text-neutral max-w-2xl mx-auto">
            Bringing people together to grow, share, and make a difference in
            communities everywhere.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold text-neutral">Our Story</h2>
            <p className="text-neutral/80 leading-relaxed">
              Community Connect was founded to create a platform where
              individuals can easily connect, collaborate, and contribute to
              meaningful community projects. Our vision is simple: unite people
              and empower them to make a positive impact.
            </p>
            <p className="text-neutral/80 leading-relaxed">
              From volunteering initiatives to local events, we help communities
              thrive while giving people opportunities to learn, network, and
              grow together.
            </p>
          </motion.div>

          <motion.div
            className="bg-primary rounded-xl p-8 shadow-lg border border-primary/20"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-neutral mb-3">
              Our Values
            </h3>
            <ul className="space-y-3 text-neutral/80">
              <li>🌱 Growth & Learning</li>
              <li>🤝 Collaboration & Networking</li>
              <li>🎗️ Social Responsibility</li>
              <li>💡 Empowerment & Skills</li>
              <li>🌍 Positive Community Impact</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-neutral mb-6">
            Meet the Founder
          </h2>
          <p className="max-w-2xl mx-auto text-neutral/70 mb-10">
            Behind Community Connect is a passionate individual committed to
            empowering communities and creating opportunities for meaningful
            engagement.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-10">
            <motion.div
              className="p-6 rounded-xl shadow border border-primary/20 bg-primary text-center w-64"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
            >
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-primary">
                <img
                  src={authorImg}
                  alt="Founder"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mt-4 text-neutral">
                Md Nurnabi Rana
              </h3>
              <p className="text-neutral/60">Founder & Developer</p>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </Container>
  );
};

export default About;