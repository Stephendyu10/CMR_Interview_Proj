import { beforeEach, describe, expect, it, vi } from "vitest";

import {
    completeRequestForUser,
    deleteRequestForUser,
    getRequestForUser,
    updateRequestForUser,
    sendRequestForUser,
} from "./requestService";

import { getUserById } from "../db/queries/users";
import {
  getRequestByIdForFirm,
  updateRequestForFirm,
} from "../db/queries/requests";

vi.mock("../db/queries/users", () => ({
  getUserById: vi.fn(),
}));

vi.mock("../db/queries/requests", () => ({
  getRequestByIdForFirm: vi.fn(),
  updateRequestForFirm: vi.fn(),
}));

const mockedGetUserById = vi.mocked(getUserById);
const mockedGetRequestByIdForFirm = vi.mocked(
  getRequestByIdForFirm,
);
const mockedUpdateRequestForFirm = vi.mocked(
  updateRequestForFirm,
);

const user = {
  id: "user-a",
  firmId: "firm-a",
  name: "User A",
  email: "usera@test.com",
  role: "ADMIN" as const,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const request = {
  id: "request-a",
  firmId: "firm-a",
  clientId: "client-a",
  engagementId: "engagement-a",
  title: "Test request",
  description: "Test request",
  status: "DRAFT",
  assignedToUserId: "user-a",
  dueDate: "2026-09-10",
  sentAt: null,
  completedAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("request workflow", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockedGetUserById.mockResolvedValue(user);
  });

  describe("sendRequestForUser", () => {
    it("transitions a DRAFT request to SENT", async () => {
      mockedGetRequestByIdForFirm.mockResolvedValue(
        request,
      );

      mockedUpdateRequestForFirm.mockResolvedValue({
        ...request,
        status: "SENT",
        sentAt: new Date(),
      });

      const result = await sendRequestForUser(
        "user-a",
        "client-a",
        "engagement-a",
        "request-a",
      );

      expect(
        mockedGetRequestByIdForFirm,
      ).toHaveBeenCalledWith(
        "request-a",
        "firm-a",
      );

      expect(
        mockedUpdateRequestForFirm,
      ).toHaveBeenCalledWith(
        "request-a",
        "firm-a",
        expect.objectContaining({
          status: "SENT",
          sentAt: expect.any(Date),
        }),
      );

      expect(result?.status).toBe("SENT");
    });

    it("rejects sending a request that is not DRAFT", async () => {
      mockedGetRequestByIdForFirm.mockResolvedValue({
        ...request,
        status: "SENT",
      });

      await expect(
        sendRequestForUser(
          "user-a",
          "client-a",
          "engagement-a",
          "request-a",
        ),
      ).rejects.toThrow(
        "Request can only be sent from DRAFT status",
      );

      expect(
        mockedUpdateRequestForFirm,
      ).not.toHaveBeenCalled();
    });

    it("rejects a request when the user does not exist", async () => {
      mockedGetUserById.mockResolvedValue(
        null as unknown as Awaited<
          ReturnType<typeof getUserById>
        >,
      );

      await expect(
        sendRequestForUser(
          "missing-user",
          "client-a",
          "engagement-a",
          "request-a",
        ),
      ).rejects.toThrow("User not found");

      expect(
        mockedGetRequestByIdForFirm,
      ).not.toHaveBeenCalled();

      expect(
        mockedUpdateRequestForFirm,
      ).not.toHaveBeenCalled();
    });

    it("does not send a request for a different client", async () => {
      mockedGetRequestByIdForFirm.mockResolvedValue(
        request,
      );

      const result = await sendRequestForUser(
        "user-a",
        "different-client",
        "engagement-a",
        "request-a",
      );

      expect(result).toBeNull();

      expect(
        mockedUpdateRequestForFirm,
      ).not.toHaveBeenCalled();
    });

    it("does not send a request for a different engagement", async () => {
      mockedGetRequestByIdForFirm.mockResolvedValue(
        request,
      );

      const result = await sendRequestForUser(
        "user-a",
        "client-a",
        "different-engagement",
        "request-a",
      );

      expect(result).toBeNull();

      expect(
        mockedUpdateRequestForFirm,
      ).not.toHaveBeenCalled();
    });

    it("does not send a request that is not found in the user's firm", async () => {
      mockedGetRequestByIdForFirm.mockResolvedValue(
        null as unknown as Awaited<
          ReturnType<typeof getRequestByIdForFirm>
        >,
      );

      const result = await sendRequestForUser(
        "user-a",
        "client-a",
        "engagement-a",
        "request-a",
      );

      expect(result).toBeNull();

      expect(
        mockedUpdateRequestForFirm,
      ).not.toHaveBeenCalled();
    });
  });

  describe("completeRequestForUser", () => {
    it("transitions a SENT request to COMPLETED", async () => {
      mockedGetRequestByIdForFirm.mockResolvedValue({
        ...request,
        status: "SENT",
        sentAt: new Date(),
      });

      mockedUpdateRequestForFirm.mockResolvedValue({
        ...request,
        status: "COMPLETED",
        sentAt: new Date(),
        completedAt: new Date(),
      });

      const result = await completeRequestForUser(
        "user-a",
        "client-a",
        "engagement-a",
        "request-a",
      );

      expect(
        mockedGetRequestByIdForFirm,
      ).toHaveBeenCalledWith(
        "request-a",
        "firm-a",
      );

      expect(
        mockedUpdateRequestForFirm,
      ).toHaveBeenCalledWith(
        "request-a",
        "firm-a",
        expect.objectContaining({
          status: "COMPLETED",
          completedAt: expect.any(Date),
        }),
      );

      expect(result?.status).toBe("COMPLETED");
    });

    it("rejects completing a request that is not SENT", async () => {
      mockedGetRequestByIdForFirm.mockResolvedValue(
        request,
      );

      await expect(
        completeRequestForUser(
          "user-a",
          "client-a",
          "engagement-a",
          "request-a",
        ),
      ).rejects.toThrow(
        "Request can only be completed from SENT status",
      );

      expect(
        mockedUpdateRequestForFirm,
      ).not.toHaveBeenCalled();
    });
  });
    describe("tenant isolation", () => {
    it("does not get a request from another firm's tenant", async () => {
        mockedGetRequestByIdForFirm.mockResolvedValue(null as unknown as Awaited<
        ReturnType<typeof getRequestByIdForFirm>
        >);

        const result = await getRequestForUser(
        "user-a",
        "client-a",
        "engagement-a",
        "request-from-firm-b",
        );

        expect(result).toBeNull();

        expect(mockedGetRequestByIdForFirm).toHaveBeenCalledWith(
        "request-from-firm-b",
        "firm-a",
        );
    });

    it("does not update a request from another firm's tenant", async () => {
        mockedGetRequestByIdForFirm.mockResolvedValue(null as unknown as Awaited<
        ReturnType<typeof getRequestByIdForFirm>
        >);

        const result = await updateRequestForUser(
        "user-a",
        "client-a",
        "engagement-a",
        "request-from-firm-b",
        {
            title: "Attempted cross-firm update",
        },
        );

        expect(result).toBeNull();

        expect(mockedGetRequestByIdForFirm).toHaveBeenCalledWith(
        "request-from-firm-b",
        "firm-a",
        );

        expect(mockedUpdateRequestForFirm).not.toHaveBeenCalled();
    });

    it("does not delete a request from another firm's tenant", async () => {
        mockedGetRequestByIdForFirm.mockResolvedValue(null as unknown as Awaited<
        ReturnType<typeof getRequestByIdForFirm>
        >);

        const result = await deleteRequestForUser(
        "user-a",
        "client-a",
        "engagement-a",
        "request-from-firm-b",
        );

        expect(result).toBeNull();

        expect(mockedGetRequestByIdForFirm).toHaveBeenCalledWith(
        "request-from-firm-b",
        "firm-a",
        );
    });

    it("does not assign a request to a user from another firm", async () => {
        const otherFirmUser = {
        ...user,
        id: "user-b",
        firmId: "firm-b",
        name: "User B",
        email: "userb@test.com",
        };

        mockedGetRequestByIdForFirm.mockResolvedValue(request);

        mockedGetUserById
        .mockResolvedValueOnce(user)
        .mockResolvedValueOnce(otherFirmUser);

        const result = await updateRequestForUser(
        "user-a",
        "client-a",
        "engagement-a",
        "request-a",
        {
            assignedToUserId: "user-b",
        },
        );

        expect(result).toBeNull();

        expect(mockedGetRequestByIdForFirm).toHaveBeenCalledWith(
        "request-a",
        "firm-a",
        );

        expect(mockedGetUserById).toHaveBeenNthCalledWith(
        2,
        "user-b",
        );

        expect(mockedUpdateRequestForFirm).not.toHaveBeenCalled();
    });
    });
});
