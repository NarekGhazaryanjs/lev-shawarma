"use client";

import { useEffect, useState } from "react";
import { BilingualField } from "@/components/admin/BilingualField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type ContactContent = {
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
};

export function AdminContactForm() {
  const [content, setContent] = useState<ContactContent | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/contact")
      .then((response) => response.json())
      .then(setContent);
  }, []);

  async function saveContent(event: React.FormEvent) {
    event.preventDefault();
    if (!content) return;

    const response = await fetch("/api/contact", {
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

      <p className="text-soft text-sm">
        Հեռախոսահամարը, հասցեն և սոցիալական ցանցերը խմբագրվում են «Կարգավորումներ» բաժնում։
      </p>

      <button type="submit" className="btn btn-brand w-fit">
        Պահպանել
      </button>
      {saved ? <p className="text-brand text-sm">Պահպանված է</p> : null}
    </form>
  );
}
