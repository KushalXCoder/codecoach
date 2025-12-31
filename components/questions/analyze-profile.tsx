import Navigator from "./navigator";
import Analyze from "./analyze";

const AnalyzeProfile = () => {
    return (
        <div className="w-2/4">
            <Analyze />
            <Navigator className="mt-10" />
        </div>
    )
}

export default AnalyzeProfile;