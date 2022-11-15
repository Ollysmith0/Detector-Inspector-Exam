import { useEffect, useState } from "react";
import tableToJson from "../../utils/TableToJson";
import Chart from "chart.js/auto";
import { saveAs } from "file-saver";

interface ConvertedDataProp {
  Mark: number;
  Athlete: string;
  Date: string;
  Venue: string;
}

interface UrlInputProp {
  url: string;
}

const TableToChart = () => {
  const [html, setHtml] = useState<string>("");
  const [urlInput, setUrlInput] = useState<UrlInputProp>({
    url: "",
  });
  const [tableContent, setTableContent] =
    useState<NodeListOf<HTMLTableElement>>();
  const [chartPreview, setChartPreview] = useState<boolean>(false);
  const tableJson = tableContent && tableToJson(tableContent[0]);
  const data = tableJson && tableJson.splice(1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const convertedData: ConvertedDataProp[] = [];
  data?.forEach((item, i) => {
    convertedData[i] = {
      Mark: Number(item[0].substr(0, 4)),
      Athlete: item[1],
      Date: item[2].substr(item[2].length - 5, item[2].length),
      Venue: item[3],
    };
  });

  useEffect(() => {
    const tables = html ? document.querySelectorAll("table") : null;
    tables && setTableContent(tables);
  }, [html]);

  useEffect(() => {
    const chart = document?.getElementById("chart")! as HTMLCanvasElement;
    if (chart !== null) {
      const myChart = new Chart(chart, {
        type: "bar",
        options: {
          animation: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
        },
        data: {
          labels: convertedData?.map((item: ConvertedDataProp) => item.Date),
          datasets: [
            {
              label: "Chart",
              data: convertedData?.map((item: ConvertedDataProp) => item.Mark),
            },
          ],
        },
      });

      return () => {
        myChart.destroy();
      };
    }
  }, [convertedData]);

  const onSubmit = (e: any) => {
    const regExp = new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
    );
    if (urlInput.url.match(regExp) !== null) {
      fetch("/search", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(urlInput),
      })
        .then((res) => res.json())
        .then((data) => setHtml(data))
        .catch((err) => console.warn(err));
    } else {
      alert("please input valid url");
    }
    e.preventDefault();
  };

  return (
    <>
      {chartPreview ? null : (
        <>
          <div
            style={{ width: "100%", height: "100%" }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <button
            style={{ margin: "10px 0" }}
            onClick={() => setChartPreview(true)}
          >
            Preview Table in page
          </button>
        </>
      )}
      <div>
        <form onSubmit={onSubmit} action="/search">
          <input
            type="text"
            placeholder="please input URL"
            onChange={(e) => {
              setUrlInput({ ...urlInput, url: e.target.value });
            }}
          />
          <input type="submit" style={{ marginLeft: 30 }} />
        </form>
      </div>
      <div>
        {chartPreview && (
          <>
            <canvas id="chart" />
            <button
              onClick={() => {
                const canvas = document?.getElementById(
                  "chart"
                ) as HTMLCanvasElement;
                canvas?.toBlob((blob: any) => saveAs(blob, "my chart.png"));
              }}
            >
              Save as Image
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default TableToChart;
