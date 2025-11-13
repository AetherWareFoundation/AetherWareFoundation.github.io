import { SITE_NAME } from "@/config";

import { Logo } from "@/components/shared/Logo";

export type MetaImageProps = {
  title: string;
  description?: string;
};

export function MetaImage({ title, description }: MetaImageProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: "80px",
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 75%, #4facfe 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Logo style={{ width: "48px", height: "48px", color: "white" }} />
        <span
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "white",
            letterSpacing: "0.2rem",
          }}
        >
          {SITE_NAME}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "900px",
        }}
      >
        <h1
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            color: "white",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          {title}
        </h1>
        {description && (
          <p
            style={{
              fontSize: "32px",
              color: "rgba(255, 255, 255, 0.9)",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {description}
          </p>
        )}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "200px",
          background:
            "linear-gradient(to top, rgba(79, 70, 229, 0.4) 0%, rgba(124, 58, 237, 0.3) 30%, transparent 100%)",
        }}
      />
    </div>
  );
}
