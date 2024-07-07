import React, { useContext, useRef, useState } from "react";
import { NewConversation } from "../interface/Types";
import { MyContext } from "./ContextProvider";
import userConversation from "../hooks/userConversation";

type Props = {
  handlerConversation: (show: boolean) => void;
  sprintManager: Array<{
    sprintName: string;
    microExperience: string[];
    module: string[];
    milestone: string[];
  }>;
};

const AddConversation: React.FC<Props> = ({
  handlerConversation,
  sprintManager,
}) => {
  const { auth } = useContext(MyContext);
  const { addNewConversation,loading } = userConversation();
  const [selectedSprint, setSelectedSprint] = useState("");
  const [selectedMicroExperience, setSelectedMicroExperience] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedMilestone, setSelectedMilestone] = useState("");
  const queryRef = useRef<HTMLInputElement>(null);

  const handleSprintChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSprint(event.target.value);
    setSelectedMicroExperience("");
    setSelectedModule("");
    setSelectedMilestone("");
  };

  const handleMicroExperienceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedMicroExperience(event.target.value);
    setSelectedModule("");
    setSelectedMilestone("");
  };

  const handleModuleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModule(event.target.value);
    setSelectedMilestone("");
  };

  const handleMilestoneChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedMilestone(event.target.value);
  };

  const getMicroExperiencesForSelectedSprint = () => {
    const sprint = sprintManager.find(
      (sprint) => sprint.sprintName === selectedSprint
    );
    return sprint ? sprint.microExperience : [];
  };

  const getModulesForSelectedSprint = () => {
    const sprint = sprintManager.find(
      (sprint) => sprint.sprintName === selectedSprint
    );
    return sprint ? sprint.module : [];
  };

  const getMilestonesForSelectedModule = () => {
    const sprint = sprintManager.find(
      (sprint) => sprint.sprintName === selectedSprint
    );
    return sprint ? sprint.milestone : [];
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (queryRef.current?.value) {
        let newConversation: NewConversation = {
          microExperience: selectedMicroExperience,
        milestone:selectedMilestone,
          module: selectedModule,
          query: queryRef.current.value,
        response: "I got you",
          sprint: selectedSprint,
          username: auth.username,
        };

      addNewConversation(newConversation);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center h-[35rem]">
      <form
        className="flex flex-col justify-between items-start gap-6 h-full w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col justify-evenly items-start gap-6 py-4">
          <div className="px-4">
            <label className="px-4 text-bgPrimary">Sprint Name</label>
            <select
              className="border rounded-md px-4 py-2 w-full"
              value={selectedSprint}
              onChange={handleSprintChange}
            >
              <option value="" disabled hidden>
                Select Sprint
              </option>
              {sprintManager.map((sprint) => (
                <option key={sprint.sprintName} value={sprint.sprintName}>
                  {sprint.sprintName}
                </option>
              ))}
            </select>
          </div>

          <div className="px-4">
            <label className="px-4 text-bgPrimary">Micro Experience</label>
            <select
              className="border rounded-md px-4 py-2 w-full"
              value={selectedMicroExperience}
              onChange={handleMicroExperienceChange}
              disabled={!selectedSprint}
            >
              <option value="" disabled hidden>
                Select Micro Experience
              </option>
              {getMicroExperiencesForSelectedSprint().map((microExperience) => (
                <option key={microExperience} value={microExperience}>
                  {microExperience}
                </option>
              ))}
            </select>
          </div>

          <div className="px-4">
            <label className="px-4 text-bgPrimary">Module Name</label>
            <select
              className="border rounded-md px-4 py-2 w-full"
              value={selectedModule}
              onChange={handleModuleChange}
              disabled={!selectedMicroExperience}
            >
              <option value="" disabled hidden>
                Select Module
              </option>
              {getModulesForSelectedSprint().map((module) => (
                <option key={module} value={module}>
                  {module}
                </option>
              ))}
            </select>
          </div>

          <div className="px-4">
            <label className="px-4 text-bgPrimary">Milestone Name</label>
            <select
              className="border rounded-md px-4 py-2 w-full"
              value={selectedMilestone}
              onChange={handleMilestoneChange}
              disabled={!selectedModule}
            >
              <option value="" disabled hidden>
                Select Milestone
              </option>
              {getMilestonesForSelectedModule().map((milestone) => (
                <option key={milestone} value={milestone}>
                  {milestone}
                </option>
              ))}
            </select>
          </div>

          <div className="px-4">
            <label className="px-4 text-bgPrimary">Query</label>
            <input
              type="text"
              className="border rounded-md px-4 py-2 w-full outline-none"
              placeholder="Enter your Query"
              ref={queryRef}
            />
          </div>
        </div>

        <div className="flex items-center justify-between w-full">
          <div
            onClick={() => handlerConversation(false)}
            className="hover:cursor-pointer bg-green-500 text-white w-full text-bgPrimary bg-secondary py-4 text-center rounded-es-xl"
          >
            Back
          </div>
          <button className="hover:cursor-pointer bg-green-300 text-white w-full py-4 text-bgPrimary text-center bg-primary">
            {!loading ? "Create" : "Creating..."}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddConversation;
