import svgPaths from "./svg-9zz4bups76";
import clsx from "clsx";
import imgBarryHeadshotsMisslydiaphoto47 from "figma:asset/f38794277b68282e48c0f1fa2968cb07117406c5.png";
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div className={clsx("flex flex-row items-center size-full", additionalClassNames)}>
      <div className="content-stretch flex gap-[8px] items-center px-[14px] py-[10px] relative w-full">{children}</div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
      <Wrapper1>{children}</Wrapper1>
    </div>
  );
}

function Input() {
  return (
    <Wrapper>
      <Content />
    </Wrapper>
  );
}

function Content() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="size-full">
        <div className="content-stretch flex gap-[8px] items-start p-[2px] relative w-full">
          <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[24.8px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#717680] text-[16px] text-nowrap"></p>
        </div>
      </div>
    </div>
  );
}
type LabelWrapperProps = {
  text: string;
  text1: string;
  additionalClassNames?: string;
};

function LabelWrapper({ text, text1, additionalClassNames = "" }: LabelWrapperProps) {
  return (
    <div className={clsx("content-stretch flex gap-[2px] not-italic relative shrink-0 text-[14px] text-nowrap", additionalClassNames)}>
      <p className="font-['Poppins:Regular',sans-serif] leading-[21.7px] relative shrink-0 text-[#414651]">{text}</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#ec221f]">{text1}</p>
    </div>
  );
}
type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return (
    <div className="bg-[#e3ffa6] content-stretch flex items-center justify-center p-[12px] relative rounded-[12px] shrink-0">
      <p className="font-['Poppins:Medium',sans-serif] leading-[19.748px] not-italic relative shrink-0 text-[#171617] text-[16px] text-nowrap tracking-[0.48px]">{text}</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-[#e3ffa6] content-stretch flex items-center justify-center left-[calc(83.33%+22px)] px-[20px] py-[12px] rounded-[12px] top-[67px]">
      <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#171617] text-[20px] text-nowrap uppercase">Contact me</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-start flex flex-wrap gap-[18px] items-start left-[calc(8.33%+46px)] top-[517px] w-[611px]">
      <Text text="A11y Consultant" />
      <Text text="Agile Methodologies" />
      <Text text="Prototyping" />
      <Text text="UI Design" />
      <Text text="UX Design" />
      <Text text="UX Research" />
      <Text text="Workshop Facilitation" />
    </div>
  );
}

function InputWithLabel() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <LabelWrapper text="Name" text1="*" additionalClassNames="items-start" />
      <Input />
    </div>
  );
}

function InputField() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[6px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Input field">
      <InputWithLabel />
    </div>
  );
}

function InputWithLabel1() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <LabelWrapper text="Email" text1="*" additionalClassNames="items-start" />
      <Input />
    </div>
  );
}

function InputField1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[6px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Input field">
      <InputWithLabel1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0 w-full">
      <InputField />
      <InputField1 />
    </div>
  );
}

function LabelWrapper1() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="Label wrapper">
      <p className="font-['Poppins:Regular',sans-serif] leading-[21.7px] not-italic relative shrink-0 text-[#414651] text-[14px] text-nowrap">Organisation</p>
    </div>
  );
}

function Content1() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[24.8px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#717680] text-[16px] text-nowrap"> </p>
    </div>
  );
}

function Input1() {
  return (
    <Wrapper>
      <Content1 />
    </Wrapper>
  );
}

function InputWithLabel2() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <LabelWrapper1 />
      <Input1 />
    </div>
  );
}

function InputField2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[6px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Input field">
      <InputWithLabel2 />
    </div>
  );
}

function Content2() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[24.8px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#717680] text-[16px] text-nowrap">Select reason</p>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-down">
          <path d="M5 7.5L10 12.5L15 7.5" id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <Wrapper1 additionalClassNames="overflow-clip rounded-[inherit]">
        <Content2 />
        <ChevronDown />
      </Wrapper1>
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
    </div>
  );
}

function InputWithLabel3() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <LabelWrapper text="Reason for Contact" text1="*" additionalClassNames="items-center" />
      <Input2 />
    </div>
  );
}

function Select() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[6px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Select">
      <InputWithLabel3 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0 w-full">
      <InputField2 />
      <Select />
    </div>
  );
}

function LabelWrapper2() {
  return (
    <div className="content-stretch flex gap-[2px] items-center not-italic relative shrink-0 text-[14px] text-nowrap" data-name="Label wrapper">
      <p className="font-['Poppins:Regular',sans-serif] leading-[21.7px] relative shrink-0 text-[#414651]">Message</p>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#ec221f]">*</p>
    </div>
  );
}

function ResizeHandle() {
  return (
    <div className="absolute bottom-[6px] right-[6px] size-[12px]" data-name="Resize handle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Resize handle">
          <path d="M10 2L2 10" id="Vector" stroke="var(--stroke-0, #D5D7DA)" strokeLinecap="round" />
          <path d="M11 7L7 11" id="Vector_2" stroke="var(--stroke-0, #D5D7DA)" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

function Input3() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-start px-[14px] py-[12px] relative size-full">
          <p className="basis-0 font-['Poppins:Regular',sans-serif] grow h-full leading-[24.8px] min-h-px min-w-px not-italic relative shrink-0 text-[#717680] text-[16px]"> </p>
          <ResizeHandle />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
    </div>
  );
}

function InputWithLabel4() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[6px] grow items-start min-h-px min-w-px relative shrink-0 w-full z-[2]" data-name="Input with label">
      <LabelWrapper2 />
      <Input3 />
    </div>
  );
}

function TextareaInputField() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[180px] isolate items-start relative shrink-0 w-full" data-name="Textarea input field">
      <InputWithLabel4 />
    </div>
  );
}

function TextPadding() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Text padding">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[2px] py-0 relative w-full">
          <p className="font-['Poppins:Medium',sans-serif] leading-[19.2px] not-italic relative shrink-0 text-[#171617] text-[16px] text-nowrap tracking-[0.48px]">Send Message</p>
        </div>
      </div>
    </div>
  );
}

function ButtonsButton() {
  return (
    <div className="bg-[#e3ffa6] relative rounded-[8px] shrink-0 w-full" data-name="Buttons/Button">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[6px] items-center justify-center px-[16px] py-[10px] relative w-full">
          <TextPadding />
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05)]" />
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.12)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <Frame2 />
      <Frame3 />
      <TextareaInputField />
      <ButtonsButton />
    </div>
  );
}

function Contact() {
  return (
    <div className="absolute bg-[#f2edff] content-stretch flex flex-col gap-[25px] items-center justify-center left-[calc(8.33%+46px)] px-[200px] py-[100px] rounded-[16px] top-[868px] w-[1108px]" data-name="Contact">
      <p className="font-['Rubik:Bold',sans-serif] font-bold leading-[51.75px] relative shrink-0 text-[#171617] text-[45px] text-center tracking-[-0.9px] w-full">Let’s Work Together</p>
      <p className="font-['Poppins:Regular',sans-serif] leading-[30px] not-italic relative shrink-0 text-[#171617] text-[20px] w-full">{`If you're hiring, exploring a collaboration, or have a project in mind, I’d love to hear from you. Send a message and I’ll respond as soon as possible.`}</p>
      <Frame4 />
    </div>
  );
}

export default function Desktop() {
  return (
    <div className="bg-[#e3dfed] relative size-full" data-name="Desktop">
      <div className="absolute h-[87px] left-[52px] top-[47px] w-[78px]" data-name="B">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 78 87">
          <path d={svgPaths.p2889000} fill="var(--fill-0, #171617)" id="B" />
        </svg>
      </div>
      <Frame1 />
      <p className="absolute font-['Rubik:Medium',sans-serif] font-medium leading-[normal] left-[calc(75%-2px)] text-[#171617] text-[20px] text-nowrap top-[79px] uppercase">Resume</p>
      <p className="absolute font-['Rubik:Bold',sans-serif] font-bold leading-[61.6px] left-[calc(8.33%+46px)] text-[#171617] text-[56px] top-[295px] tracking-[-1.12px] w-[630px]">Product Designer Who Simplifies the Complex</p>
      <Frame />
      <p className="absolute font-['Poppins:Regular',sans-serif] leading-[30px] left-[calc(8.33%+46px)] not-italic text-[#171617] text-[20px] top-[433px] w-[611px]">Building accessible, user-centred products by connecting design, engineering, and business around what matters.</p>
      <p className="absolute font-['Poppins:Regular',sans-serif] leading-[21.7px] left-[calc(8.33%+46px)] not-italic text-[#171617] text-[14px] top-[1824px] w-[611px]">©️ Barry Conlon 2025.</p>
      <div className="absolute h-[539px] left-[calc(58.33%+15px)] rounded-[16px] top-[195px] w-[419px]" data-name="Barry Headshots _misslydiaphoto-47">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px]">
          <img alt="" className="absolute h-[116.56%] left-0 max-w-none top-[-16.56%] w-full" src={imgBarryHeadshotsMisslydiaphoto47} />
        </div>
      </div>
      <Contact />
    </div>
  );
}