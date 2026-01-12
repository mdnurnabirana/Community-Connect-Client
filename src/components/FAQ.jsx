import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "Who can join these events?",
    answer:
      "Anyone can join! Students, professionals, families, and community members are welcome. No prior experience is required—just a willingness to help.",
  },
  {
    question: "Is there any cost to participate?",
    answer:
      "No. All events listed on Community Connect are free to join. Some events may suggest bringing personal items like gloves or water bottles.",
  },
  {
    question: "What should I bring to an event?",
    answer:
      "This depends on the event type. Cleanup events may require gloves, plantation events may involve digging tools, and donation drives may simply require your contribution.",
  },
  {
    question: "Can I join multiple events?",
    answer:
      "Absolutely! You can join as many events as you like and track them from your dashboard.",
  },
  {
    question: "How do I know my contribution matters?",
    answer:
      "Each event is organized by verified community members or organizations. Your participation directly supports environmental protection, social welfare, and community development.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="my-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-neutral text-3xl sm:text-4xl font-bold text-center mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-neutral/95 mb-10 max-w-2xl mx-auto">
            Everything you need to know before joining a club or event
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="grid gap-4 sm:gap-5">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="bg-linear-to-r from-base-200 to-base-100 rounded-xl shadow-lg border border-base-200 overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-semibold text-lg text-neutral/90">
                  {faq.question}
                </span>
                <span className="text-xl text-neutral/70">
                  {activeIndex === index ? <FiMinus /> : <FiPlus />}
                </span>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden px-5 pb-5"
                  >
                    <p className="text-neutral/70 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;