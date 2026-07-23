"use client";

import { useEffect, useState } from "react";
import { BilingualField } from "@/components/admin/BilingualField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type DeliveryContent = {
  label: string;
  labelRu: string;
  title: string;
  titleRu: string;
  intro: string;
  introRu: string;
  paragraph1: string;
  paragraph1Ru: string;
  paragraph2: string;
  paragraph2Ru: string;
  image: string;
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

export function AdminDeliveryForm() {
  const [content, setContent] = useState<DeliveryContent | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/delivery")
      .then((response) => response.json())
      .then(setContent);
  }, []);

  async function saveContent(event: React.FormEvent) {
    event.preventDefault();
    if (!content) return;

    const response = await fetch("/api/delivery", {
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
        label="Վերնագրի նշում"
        valueHy={content.label}
        valueRu={content.labelRu}
        onChangeHy={(label) => setContent({ ...content, label })}
        onChangeRu={(labelRu) => setContent({ ...content, labelRu })}
      />
      <BilingualField
        label="Վերնագիր"
        valueHy={content.title}
        valueRu={content.titleRu}
        onChangeHy={(title) => setContent({ ...content, title })}
        onChangeRu={(titleRu) => setContent({ ...content, titleRu })}
      />
      <BilingualField
        label="Կարճ ներածություն"
        valueHy={content.intro}
        valueRu={content.introRu}
        onChangeHy={(intro) => setContent({ ...content, intro })}
        onChangeRu={(introRu) => setContent({ ...content, introRu })}
        multiline
      />
      <BilingualField
        label="Տեքստ 1"
        valueHy={content.paragraph1}
        valueRu={content.paragraph1Ru}
        onChangeHy={(paragraph1) => setContent({ ...content, paragraph1 })}
        onChangeRu={(paragraph1Ru) => setContent({ ...content, paragraph1Ru })}
        multiline
      />
      <BilingualField
        label="Տեքստ 2"
        valueHy={content.paragraph2}
        valueRu={content.paragraph2Ru}
        onChangeHy={(paragraph2) => setContent({ ...content, paragraph2 })}
        onChangeRu={(paragraph2Ru) => setContent({ ...content, paragraph2Ru })}
        multiline
      />

      <div>
        <span className="text-soft mb-2 block text-sm font-semibold">Նկար</span>
        <ImageUploadField
          value={content.image}
          onChange={(url) => setContent({ ...content, image: url })}
        />
      </div>

      <div className="space-y-3 border-t border-black/8 pt-4">
        <p className="font-bold">Պատվերի քայլեր</p>
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
