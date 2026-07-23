"use client";

import { useEffect, useState } from "react";
import { BilingualField } from "@/components/admin/BilingualField";

type HomeContent = {
  heroTagline: string;
  heroTaglineRu: string;
  aboutText: string;
  aboutTextRu: string;
  step1Title: string;
  step1TitleRu: string;
  step1Text: string;
  step1TextRu: string;
  step2Title: string;
  step2TitleRu: string;
  step2Text: string;
  step2TextRu: string;
  step3Title: string;
  step3TitleRu: string;
  step3Text: string;
  step3TextRu: string;
};

export function AdminHomeForm() {
  const [content, setContent] = useState<HomeContent | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/home")
      .then((response) => response.json())
      .then(setContent);
  }, []);

  async function saveContent(event: React.FormEvent) {
    event.preventDefault();
    if (!content) return;

    const response = await fetch("/api/home", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });

    if (response.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  if (!content) {
    return <p className="text-soft">Բեռնվում է...</p>;
  }

  return (
    <form onSubmit={saveContent} className="surface grid gap-4 p-6">
      <BilingualField
        label="Hero — կարճ նկարագրություն"
        valueHy={content.heroTagline}
        valueRu={content.heroTaglineRu}
        onChangeHy={(heroTagline) => setContent({ ...content, heroTagline })}
        onChangeRu={(heroTaglineRu) => setContent({ ...content, heroTaglineRu })}
        multiline
      />
      <BilingualField
        label="«Մեր մասին» բլոկի տեքստ"
        valueHy={content.aboutText}
        valueRu={content.aboutTextRu}
        onChangeHy={(aboutText) => setContent({ ...content, aboutText })}
        onChangeRu={(aboutTextRu) => setContent({ ...content, aboutTextRu })}
        multiline
      />

      <div className="space-y-3 border-t border-black/8 pt-4">
        <p className="font-bold">Պատվերի քայլեր (գլխավոր էջ)</p>
        <BilingualField
          label="Քայլ 1 — վերնագիր"
          valueHy={content.step1Title}
          valueRu={content.step1TitleRu}
          onChangeHy={(step1Title) => setContent({ ...content, step1Title })}
          onChangeRu={(step1TitleRu) => setContent({ ...content, step1TitleRu })}
        />
        <BilingualField
          label="Քայլ 1 — նկարագրություն"
          valueHy={content.step1Text}
          valueRu={content.step1TextRu}
          onChangeHy={(step1Text) => setContent({ ...content, step1Text })}
          onChangeRu={(step1TextRu) => setContent({ ...content, step1TextRu })}
          multiline
        />
        <BilingualField
          label="Քայլ 2 — վերնագիր"
          valueHy={content.step2Title}
          valueRu={content.step2TitleRu}
          onChangeHy={(step2Title) => setContent({ ...content, step2Title })}
          onChangeRu={(step2TitleRu) => setContent({ ...content, step2TitleRu })}
        />
        <BilingualField
          label="Քայլ 2 — նկարագրություն"
          valueHy={content.step2Text}
          valueRu={content.step2TextRu}
          onChangeHy={(step2Text) => setContent({ ...content, step2Text })}
          onChangeRu={(step2TextRu) => setContent({ ...content, step2TextRu })}
          multiline
        />
        <BilingualField
          label="Քայլ 3 — վերնագիր"
          valueHy={content.step3Title}
          valueRu={content.step3TitleRu}
          onChangeHy={(step3Title) => setContent({ ...content, step3Title })}
          onChangeRu={(step3TitleRu) => setContent({ ...content, step3TitleRu })}
        />
        <BilingualField
          label="Քայլ 3 — նկարագրություն"
          valueHy={content.step3Text}
          valueRu={content.step3TextRu}
          onChangeHy={(step3Text) => setContent({ ...content, step3Text })}
          onChangeRu={(step3TextRu) => setContent({ ...content, step3TextRu })}
          multiline
        />
      </div>

      <button type="submit" className="btn btn-brand w-fit">
        Պահպանել
      </button>
      {saved ? <p className="text-brand text-sm">Պահպանված է</p> : null}
    </form>
  );
}
