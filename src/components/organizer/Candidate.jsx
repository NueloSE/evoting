function Candidate() {
    return (
      <div>
        <div>
          <div className="md:max-w-full">
            <div className="flex flex-wrap sm:flex-nowrap  justify-between items-center gap-4 p-2">
              <h4>All Candidates Overview</h4>
            </div>

            {/* category  cards */}
            <div className="border border-slate-300 p-4 rounded-xl">
              <div>
                {/* title */}
                <div className="flex gap-2 justify-between px-2">
                  <div>
                    <h5 className="font-bold">
                      Student Council Elections 2024
                    </h5>
                    <p>Election: ELC001</p>
                  </div>
                </div>
                {/* candidates */}
                <div className="mt-8 px-2 ">
                  {/* office 1 */}
                  <div className="space-y-3">
                    <p>President</p>
                    <div className="flex flex-col md:flex-row gap-2">
                      {/* candidate 1 */}
                      <div className="flex justify-between items-center gap-2 bg-slate-300/30 p-4 rounded-lg">
                        <div>
                          <h5 className="font-bold">Alice Johnson</h5>
                          <p className="text-sm py-0.5">
                            3rd year Business student with leadership experience
                          </p>
                          <p className="text-xs border border-slate-300 font-bold p-1 w-fit rounded-sm">
                            Progressive Student Alliance
                          </p>
                        </div>
                      </div>

                      {/* candidate 2 */}
                      <div className="flex justify-between items-center gap-2 bg-slate-300/30 p-4 rounded-lg">
                        <div>
                          <h5 className="font-bold">Bob Chen</h5>
                          <p className="text-sm py-0.5">
                            4th year Engineering student, former class
                            representative
                          </p>
                          <p className="text-xs border border-slate-300 font-bold p-1 w-fit rounded-sm">
                            Students First
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* office 2 */}
                  <div className="space-y-3">
                    <p>President</p>
                    <div className="flex flex-col md:flex-row gap-2">
                      {/* candidate 1 */}
                      <div className="flex justify-between items-center gap-2 bg-slate-300/30 p-4 rounded-lg">
                        <div>
                          <h5 className="font-bold">Alice Johnson</h5>
                          <p className="text-sm py-0.5">
                            3rd year Business student with leadership experience
                          </p>
                          <p className="text-xs border border-slate-300 font-bold p-1 w-fit rounded-sm">
                            Progressive Student Alliance
                          </p>
                        </div>
                      </div>

                      {/* candidate 2 */}
                      <div className="flex justify-between items-center gap-2 bg-slate-300/30 p-4 rounded-lg">
                        <div>
                          <h5 className="font-bold">Bob Chen</h5>
                          <p className="text-sm py-0.5">
                            4th year Engineering student, former class
                            representative
                          </p>
                          <p className="text-xs border border-slate-300 font-bold p-1 w-fit rounded-sm">
                            Students First
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Candidate