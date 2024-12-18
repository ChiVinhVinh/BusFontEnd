export const fetchTrips = async (diemdi: string, diemden: string, selectDate: string) => {
    try {
        const response = await fetch('http://localhost:8080/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                DiemDi: diemdi,
                DiemDen: diemden,
                NgayDi: selectDate,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch matching trips");
        }
        const { Trip, TimeCounts } = await response.json();
        return { Trip, TimeCounts };
    } catch (error) {
        console.error("Error fetching trips:", error);
        throw error;
    }
};

export const fetchData = async (url: string) => {
    try {
        const reponse = await fetch(url);
        if (!reponse.ok) {
            throw new Error("Fail get data")
        }
        return await reponse.json();
    }
    catch (error) {
        console.error("Fetch data error", error);
        throw error;
    }
}
export const updateData = async (url: string, data: any) => {
    try {
        const reponse = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (!reponse.ok) {
            throw new Error("Fail to Update data")
        }
        return await reponse.json();
    }
    catch (error) {
        console.error("Update data error :", error);
        throw error;
    }
}
export const patchData = async (url: string, data: any) => {
    try {
        const reponse = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (!reponse.ok) {
            throw new Error("Fail to update")
        }
        return await reponse.json();
    } catch (error) {
        console.error("Update data error :", error);
        throw error;
    }
}
export const deletedData = async (url: string) => {
    try {
        const response = await fetch(url, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error("Failed to delete data")
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to delete data:", error)
        throw error;
    }
};

