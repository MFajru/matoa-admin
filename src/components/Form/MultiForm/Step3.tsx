import { Button } from "@/components/Button/Button";
import { TMultiForm } from "@/types/form";
import { TextAreaField } from "@/components/Form/TextAreaField";

export const Step3 = ({
  formData,
  setFormData,
  setStep,
  step,
  handleOnSubmit,
}: TMultiForm) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((exisitingData) => {
      return {
        ...exisitingData,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <>
      <h2 className="uppercase text-xl font-semibold mt-5">Detail</h2>
      <form className="flex flex-col gap-4 mt-5" onSubmit={handleOnSubmit}>
        <TextAreaField
          label="Material"
          name="material"
          placeholder="Put material description here..."
          value={formData.material}
          onChange={handleOnChange}
        />
        <TextAreaField
          label="Case"
          name="caseDetail"
          placeholder="Put case description here..."
          value={formData.caseDetail}
          onChange={handleOnChange}
        />
        <TextAreaField
          label="Movement"
          name="movement"
          placeholder="Put movement description here..."
          value={formData.movement}
          onChange={handleOnChange}
        />
        <TextAreaField
          label="Dial"
          name="dial"
          placeholder="Put dial description here..."
          value={formData.dial}
          onChange={handleOnChange}
        />
        <TextAreaField
          label="Hand"
          name="hand"
          placeholder="Put hand description here..."
          value={formData.hand}
          onChange={handleOnChange}
        />
        <TextAreaField
          label="Important Note"
          name="importantNote"
          placeholder="Put important note here..."
          value={formData.importantNote}
          onChange={handleOnChange}
        />
        <div className="flex justify-end mt-10 gap-4">
          <Button
            type="button"
            variants="primaryNoRound"
            onClick={() => setStep((step -= 1))}
          >
            Prev
          </Button>
          <Button type="submit" variants="primaryNoRound">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};
